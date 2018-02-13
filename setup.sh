mkdir bin
echo "# [#issue] pair1/pair2 - subject ----------------

# #issue refers to the issue number

# ----------------------------------------------------------------------

What changes have you made?

*

Why do we need this change?

*
What can this change impact?" > ./bin/gitCommitTemplate.txt

git config --local commit.template bin/gitCommitTemplate.txt

npm install
npm test
npm start
