
const fs = require('fs');
const path = require('path');

const pages = require('./pages.js');
const model = require('./model.js');
const editor = require('./editor.js');

module.exports.hide = function() {
  $("#page-browser").hide();
};

module.exports.show = function() {
  $("#page-browser").show();

  // Update title
  var displayTitle = path.basename(model.gitRepoPath());
  $("#page-browser .header h1").text(displayTitle);


  // Load the files from the Git repo
  var root = TreeNode('root', [], "");
  var sourceDir = path.join(model.gitRepoPath(), 'src'); // TODO: Hardcode bad
  getDirectories(sourceDir, root);


  // Display the files from the Git repo
  $("#browser-list").html(renderDirectory(root));

  $(".file-item").click(function(e) {
    e.stopPropagation();

    editor.editFile($(this).prop('dataset').path);
    pages.setPage(editor);
  });
};

// All pages should start out hidden
module.exports.hide();


// --- Document Stuff --

$(document).ready(function() {

});


// --- Tree Helpers ---

function renderDirectory(node) {
  var result = "<ul>";
  for (var childNode of node.contents) {
    if (childNode.contents.length > 0) {
      // No `data-path` attribute or `file-item` class for folders
      result += "<li>" + childNode.name + "/";

      // Add nested list for directories
      result += renderDirectory(childNode);
      result += "</li>";
    } else {
      // Not a folder, give it a data-path and class to make it selectable
      result += "<li data-path='" + childNode.fullPath + "' class='file-item'>";
      result += childNode.name;
      result += "</li>";
    }
  }
  result += "</ul>";
  return result;
}

// Recursively record files into `node`, which should be a TreeNode object
function getDirectories(dir, node) {
  var files = fs.readdirSync(dir);
  for (var file of files) {
    if (file.startsWith(".")) {
      continue;
    }
    if (window.ignoredFolders.indexOf(file) > -1) {
      continue;
    }
    // Add the node
    var fullPath = path.join(dir, file);
    var newNode = TreeNode(file, [], fullPath);
    node.contents.push(newNode);
    if (fs.statSync(fullPath).isDirectory()) {
      // Add contents of that directory
      getDirectories(fullPath, newNode);
    }
  }
}

function TreeNode(name, contents, fullPath, id) {
  return {"name": name, "contents": contents, "fullPath": fullPath};
}
