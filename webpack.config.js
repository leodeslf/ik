const path = require('path');

module.exports = {
  entry: ['./src/IKModule.js', 'IKJoint.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "IK.js"
  }
}