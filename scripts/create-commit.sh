SCOPE=$1
VERSION=$2

echo $SCOPE
echo $VERSION

git add .
echo "Your changes were staged successfully";

git commit -m "feat($SCOPE): generate new image with version $VERSION"
echo "Your changes were committed with the following message:
feat($SCOPE): generate new image with version $VERSION"