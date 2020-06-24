class BinaryTree {
    // inicializa a raiz como nula
    constructor() {
        this.root = null
    }

    //exibe o menor valor da arvore
    //Dhiego: ele verifica se o valor na variavel é nulo, caso seja ele retorna nulo
    //caso não, ele vai descer a arvore verificando a esquerda de cada raiz, até que
    //encontre uma raiz que a esquerda que seja nula, ai ela sera o menor valor.
    min() {
    min() {
        let current = this.root
        if (current == null)
            return null
        while (current.left != null)
            current = current.left
        return current.content
    }

    //exibe o maior valor da arvore
    //Dhiego: ele verifica se o valor na variavel é nulo, caso seja ele retorna nulo
    //caso não, ele vai descer a arvore verificando a direita de cada raiz, até que
    //encontre uma raiz que a direita seja nula, ai ela sera o maior valor.
    max() {
        let current = this.root
        if (current == null)
            return null
        while (current.right != null)
            current = current.right
        return current.content
    }

    //insere o elemento da arvores
    //Dhiego: metodo de inserção: são chamadas recursivas para inserção, ele chama de
    //maneira recusriva o insert nó, se ele encontrar o lugar ele retorna o nó e a posição
    //que era nula se torna o novo elemento, se não, se for maior ou menor ele manda inserir
    //na direita ou na esquerda.
    insert(element) {
        this.root = this.insertNode(this.root, element)
    }

    insertNode(rootNode, element) {
        if (rootNode == null)
            return new Node(element)
        if (element > rootNode.content)
            rootNode.right = this.insertNode(rootNode.right, element)
        else
            rootNode.left = this.insertNode(rootNode.left, element)
        return rootNode
    }

    //executa a função callback para cada nó, em ordem
    //Dhiego: Ele primeiro verifica se tá o node tá nulo caso esteja ele não mostra nada
    //se não ai mostra a esquerda, mostra  a raiz e por fim a direita
    inOrderTraverse(callback) {
        this.inOrderVisitor(this.root, callback)
    }

    inOrderVisitor(node, callback) {
        if (node == null)
            return
        this.inOrderVisitor(node.left, callback)
        callback(node.content)
        this.inOrderVisitor(node.right, callback)
    }

    //executa a função callback para cada nó, em pré-ordem
    //Dhiego: Ele começa da raiz, primeiro chama o conteúdo e depois chama os outros nó, 
    //o da esquerda e depois o da direita.
    preOrderTraverse(callback) {
        this.preOrderVisitor(this.root, callback)
    }

    preOrderVisitor(node, callback) {
        if (node == null)
            return
        callback(node.content)
        this.preOrderVisitor(node.left, callback)
        this.preOrderVisitor(node.right, callback)
    }

    //executa a função callback para cada nó, em pós-ordem
    //Dhiego: Nesse caso ele começa pelos nó a esquerda e a direita e depois que mostra 
    //o conteudo.
    postOrderTraverse(callback) {
        this.postOrderVisitor(this.root, callback)
    }

    postOrderVisitor(node, callback) {
        if (node == null)
            return
        this.postOrderVisitor(node.left, callback)
        this.postOrderVisitor(node.right, callback)
        callback(node.content)
    }

    //retorna true se o valor já existe na arvore 
    //     Busca na árvore binária
    //    1. É nulo? o elemento não existe
    //    2. É igual ao conteúdo? achou
    //    3. É maior que o conteúdo?
    //       3.1 busca de direita
    //       3.2 busca na esquerda
    //Dhiego: Ele vai verificar se o elemento é nulo, se for ele retorna nulo.
    //Se o valor for encontrado ele retorna o valor
    //Se não é nem nulo nem igual e se o elemento é maior que
    //o conteudo então ele busca na direita e retorna esse valor,
    //se caso seja menor ele vai buscar o valor na esquerda. 

    search(value) {
        return this.searchVisitor(this.root, value)
    }

    searchVisitor(node, element) {
        if (node == null)
            return false
        if (node.content == element)
            return true;
        if (element > node.content)
            return this.searchVisitor(node.right, element)
        else
            return this.searchVisitor(node.left, element)
    }

    //remove um elemento existente na arvore o retorna
    //Dhiego: Ele remove o valor, e depois atualiza a tabela,ai ele verifica se a direita e
    // a esquerda são nulos caso sim ela retorna nulo,
    //se não ele verifica se a direita é nulo, caso seja ele retorna a esqueda
    //se não ele verifica a esquerda se for nulo, ele retorna a direita.
    //caso ele tenha os dois nó ele retorna o valor que for maior 
    remove(value) {
        this.root = this.removeVisitor(this.root, value)
    }

    removeVisitor(node, value) {
        if (node.content == value) {
            if (node.left == node.right) {
                //nao tem filhos - Grau 0
                return null
            } else if (node.right == null) {
                //não tem filhos na direita, e tem nó na esqueda - Grau 1
                return node.left
            } else if (node.left == null) {
                //não tem filhos da esquerda, e tem nó da direita - Grau 1
                return node.right
            } else {
                // tem os dois ramos - Grau 2
                const newRoot = node.right
                let current = node.right;
                while (current.left != null)
                    current = current.left
                current.left = node.left
                return newRoot;
            }
        } else if (value < node.content) {
            node.left = this.removeVisitor(node.left, value)
        } else {
            node.right = this.removeVisitor(node.right, value)
        }
        return node;
    }

    //exibe a altura da arvore
    //Dhiego: primeiro ele verifica se o nó não tem nada, se ele não tiver ele retorna -1
    //se não ele  verifica a altura esquerda e depois da direita.
    height() {
        return this.heightVisitor(this.root)
    }

    heightVisitor(node) {
        if (!node)
            return -1
        let leftHeight = this.heightVisitor(node.left),
            rightHeight = this.heightVisitor(node.right)
        return Math.max(leftHeight, rightHeight) + 1
    }

    // informa quantos nós existem na arvore
    //Dhiego: Ele verifica primeiro se tem nó caso não tenha ele retorna 0, caso tenha
    //ele verifica os nós a direita e esquerda e soma mais 1.
    size() {
        return this.sizeVisitor(this.root)
    }

    sizeVisitor(node) {
        if (!node)
            return 0
        return this.sizeVisitor(node.left) + this.sizeVisitor(node.right) + 1
    }
}
