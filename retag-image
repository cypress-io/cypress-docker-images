#!/usr/bin/env perl

use File::Temp qw/ tempfile /;
use File::Which;

my $default_tag='latest';

sub usage {
    print STDERR "$0 IMAGE_TO_RETAG [TAG]

Use manifest-tool to assign an additional TAG to IMAGE_TO_RETAG.

    TAG defaults to ${default_tag}
";
}

unless (which('manifest-tool')) {
    print STDERR "Please install manifest-tool <https://github.com/estesp/manifest-tool>";
    exit 1;
}

my $image=shift @ARGV;
unless (defined $image) {
    usage();
    exit 1;
}

if ($image eq '--help' || $image eq '-h') {
    usage();
    exit 0;
}

my $tag=shift @ARGV || $default_tag;
my $manifest_info=`manifest-tool inspect "$image"`;
my ($fh, $manifest)=tempfile();

for (split /\n/, $manifest_info) {
    if (/^Name:\s+(\S+):/) {
        $name=$1;
        print $fh "image: $name:$tag\n"."manifests:\n";
    } elsif (/Digest: (\S+)/) {
        $digest=$1;
    } elsif (/OS: (\S+)/) {
        $os=$1;
    } elsif (/Arch: (\S+)/) {
        print $fh "- image: $name\@$digest\n  platform:\n    architecture: $1\n    os: $os\n";
        $os="";
        $digest="";
    }
}
close $fh;
my $result=system "manifest-tool push from-spec $manifest";
exit $result if $result;
unlink $manifest;
