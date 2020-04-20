# facerecognitionapp
ZeroToMastery Web Development Final Project

An app for recognition of faces and scores based on rank. This is just a journal and fixing warnings, issues along the way of the tutorial.

Known issues:
1. react-tilt library uses findDOMnode which is a deprecated function soon to be removed, raises a warning due to React.StrictMode.


Fixes:
1. Changed react-tilt to react-vanilla-tilt library that helps removing the warning of issue #1.
