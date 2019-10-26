'use strict';

var FileTreeNode = function (nodeId, name, type) {
  var children = [];

  this.nodeId = nodeId;
  this.name = name;
  this.type = type;
  this.parentNode = null;

  this.setParent = function (parentNode) {
    this.parentNode = parentNode;
  };
  this.addChild = function (node) {
    if (this.type !== 'DIRECTORY') {
      throw "Cannot add child node to a non-directory node";
    }
    children.push(node);
    node.setParent(this);
  };
  this.getChildren = function () {
    return children;
  };
};

var FileTree = function () {
  this.nodes = [];

  this.getRootNodes = function () {
    var result = [];
    for (var i = 0; i < this.nodes.length; i++) {
      if (!this.nodes[i].parentNode) {
        result.push(this.nodes[i]);
      }
    }
    return result;
  };
  this.findNodeById = function (nodeId) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].nodeId === nodeId) {
        return this.nodes[i];
      }
    }
    return null;
  };
  this.createNode = function (nodeId, name, type, parentNode) {
    var node = new FileTreeNode(nodeId, name, type);
    if (parentNode) {
      parentNode.addChild(node);
    }
    this.nodes.push(node);
  }
};

const defaultKey = Symbol("defaultKey");

/**
 * @param {Array<*>} collection
 * @param {string} path
 */
function groupBy(collection, path) {
  return collection.reduce((acc, ele) => {
    const key = ele[path] || defaultKey
    acc[key] = [...(acc[key] || []), ele];
    return acc;
  }, {});
}

function createFileTree(input) {
  var fileTree = new FileTree();

  const grouped = groupBy(input, "parentId");
  createTree(grouped, defaultKey, fileTree);
  return fileTree;
}

function createTree(grouped, key, fileTree) {
  grouped[key] && grouped[key].forEach(ele => {
    var parentNode = ele.parentId ? fileTree.findNodeById(ele.parentId) : null;
    fileTree.createNode(ele.id, ele.name, ele.type, parentNode);
    createTree(grouped, ele.id, fileTree)
  });
}
