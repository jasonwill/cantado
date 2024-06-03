export interface CantoItem {
    height: string;
    ownerName: string;
    dpi: string;
    idPath: string;
    namePath: string;
    created: string;
    url: {
      detail: string;
      preview?: string;
    };
    time: string;
    width: string;
    name: string;
    id: string;
    size: string;
    scheme: string;
    owner: string;
    children?: CantoItem[];
  }
  
  export interface TreeNode {
    name: string;
    id: string;
    children: TreeNode[];
  }

  export interface TreeNodeProps {
    node: TreeNode;
  }
  
  export function buildTree(cantoItems: CantoItem[]): TreeNode {
    // Create a map to store references to all nodes
    const idToNodeMap: { [key: string]: TreeNode } = {};


    // Create nodes and populate the map
    for (const item of cantoItems) {
      idToNodeMap[item.idPath] = {
        name: item.name,
        id: item.id,
        children: []
      };
    }

    console.log(JSON.stringify(idToNodeMap,null,2));

    let root: TreeNode | null = null;
  
    // Function to recursively build the tree
    function addChildToParent(node: TreeNode, parentIdPath: string): void {

       const parentNode = idToNodeMap[parentIdPath];
       console.log(parentNode)
      if (parentNode) {
        parentNode.children.push(node);
      } else {
        root = node; // If no parent, it's the root node
      }
      console.log(root)

    }
  
    // Recursively build the tree structure
    for (const item of cantoItems) {
      
      const node = idToNodeMap[item.idPath];
      let parentIdPath;

      if (item.idPath.substring(0, item.idPath.lastIndexOf('/'))===''){
        parentIdPath = item.idPath;
      } else {
        console.log('there be a child');
        parentIdPath = item.idPath.substring(0, item.idPath.lastIndexOf('/'));
      } 

      console.log(JSON.stringify(parentIdPath,null,2));

      addChildToParent(node, parentIdPath);
    }

    return root!;
  }
