//VARIÁVEIS GLOBAIS
let cart = []
let cartQtty = 0
let pizzaSizes = ['Pequena', 'Média', 'Grande']
const pizzaWindowArea = document.querySelector('.pizzaWindowArea')

//FUNÇÃO QUE TRANSFORMA O VALOR PARA O VALOR PADRÃO BR COM A LEGENDA MONETÁRIA
const priceBr = (price) => price.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })

//FUNÇÃO QUE SETA OS DADOS DA PIZZA SELECIONADA NO MODAL
const setModal = (pizza) => {
    pizzaWindowArea.setAttribute('data-key', pizza.id)
    pizzaWindowArea.querySelector('.pizzaInfo--qt').src = 1
    pizzaWindowArea.querySelector('.pizzaBig img').src = pizza.img
    pizzaWindowArea.querySelector('.pizzaInfo h1').innerHTML = pizza.name
    pizzaWindowArea.querySelector('.pizzaInfo .pizzaInfo--desc').innerHTML = pizza.description
    pizzaWindowArea.querySelector('.pizzaInfo--qt').innerHTML = 1
    pizzaWindowArea.querySelector('.pizzaInfo--actualPrice').innerHTML = priceBr(pizza.price)
    pizzaWindowArea.querySelectorAll('.pizzaInfo--size').forEach(e => {        
        e.querySelector('span').innerHTML = pizza.sizes[e.getAttribute('data-key')]
    })
}

//FUNÇÃO QUE RESETA O MODAL DE SELEÇÃO DE PIZZA SETANDO TODOS OS CAMPOS PARA O INICIAL
const resetModal = () => {
    pizzaWindowArea.setAttribute('data-key', '')
    pizzaWindowArea.querySelector('.pizzaInfo--qt').src = 1
    pizzaWindowArea.querySelector('.pizzaBig img').src = ''
    pizzaWindowArea.querySelector('.pizzaInfo h1').innerHTML = ''
    pizzaWindowArea.querySelector('.pizzaInfo .pizzaInfo--desc').innerHTML = ''
    pizzaWindowArea.querySelector('.pizzaInfo--actualPrice').innerHTML = ''
    pizzaWindowArea.querySelector('.pizzaInfo--qt').innerHTML = 1
    pizzaWindowArea.querySelector('.pizzaInfo--size.selected') ? pizzaWindowArea.querySelector('.pizzaInfo--size.selected').classList.remove('selected') : null
    pizzaWindowArea.querySelector('.pizzaInfo--size.selected') ? pizzaWindowArea.querySelector('.pizzaInfo--size.selected').classList.remove('selected') : null
    pizzaWindowArea.querySelectorAll('.pizzaInfo--size').forEach(e => {        
        e.querySelector('span').innerHTML = ''
        e.getAttribute('data-key') == 2 ? e.classList.add('selected') : null
    })
}

//FUNÇÃO QUE ABRE O MODAL DE SELEÇÃO DE PIZZA
const openModalPizza = (pizza) => {    
    setModal(pizza)
    pizzaWindowArea.style.display = 'flex'
    setTimeout(() => {
        pizzaWindowArea.style.opacity = 1
    }, 0)  
}

//FUNÇÃO QUE FECHA O MODAL DE SELEÇÃO DE PIZZA
const closeModalPizza = () => {
    pizzaWindowArea.style.opacity = 0
    setTimeout(() => {
        pizzaWindowArea.style.display = 'none'
        resetModal()
    }, 500)
}

//FUNÇÃO QUE ATUALIZA OS DADOS DO CARRINHO
const updateCart = () => {
    let priceTotal = 0
    let priceDiscount = 0
    let priceTotalWithDiscount = 0
    document.querySelector('.cart').innerHTML = ''
    cart.forEach(e => {
        let pizzaCartContainer = document.querySelector('.cart--item').cloneNode(true)   
        pizzaCartContainer.setAttribute('data-key',e.identifier)
        pizzaCartContainer.querySelector('img').src = e.pizza.img
        pizzaCartContainer.querySelector('.cart--item-nome').innerHTML = `${e.pizza.name} (${pizzaSizes[e.size]})`
        pizzaCartContainer.querySelector('.cart--item--qt').innerHTML = e.qtty
        document.querySelector('.cart').append(pizzaCartContainer)
        priceTotal = priceTotal + parseInt(e.qtty)*e.pizza.price
        priceDiscount = priceTotal - (priceTotal - (priceTotal*10/100))
        priceTotalWithDiscount = priceTotal - priceDiscount
        document.querySelectorAll('.subtotal span')[1].innerHTML = priceBr(priceTotal)
        document.querySelectorAll('.desconto span')[1].innerHTML = priceBr(priceDiscount)
        document.querySelectorAll('.total span')[1].innerHTML = priceBr(priceTotalWithDiscount)
    })
    addEventsCart()
}

//ADICIONA OS EVENTOS DE ADICIONAR OU REMOVER PIZZAS DO CARRINHO
const addEventsCart = () => {
    document.querySelectorAll('.cart--item[data-key]').forEach(e => {
        let identifier = e.getAttribute('data-key')
        let itemCart = cart.find(item => item.identifier === identifier);
        e.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
            if(itemCart.qtty > 1){
                itemCart.qtty = itemCart.qtty - 1
            } else {
                cart = cart.filter(item => item.identifier !== identifier)
            }
            updateCart()
            cart.length <= 0 ? closeCart() : null
        })
        e.querySelector('.cart--item-qtmais').addEventListener('click', () => {
            itemCart.qtty = itemCart.qtty + 1
            updateCart()
        })
    })
    updateCartNumber()
}

//FUNÇÃO QUE ABRE O MODAL DO CARRINHO
const openCart = () => {
    if(cartQtty > 0){
        updateCart()
        document.querySelector('aside').style.left = 0 
        document.querySelector('aside').classList.add('show') 
    }
}

//FUNÇÃO QUE FECHA O MODAL DO CARRINHO
const closeCart = () => {
    document.querySelector('aside').style.removeProperty("left");
    document.querySelector('aside').classList.remove('show') 
}

//FUNÇÃO QUE SOMA A QUANTIDADE DE PIZZAS NO CARRINHO MOBILE
const updateCartNumber = () => {
    cartQtty = cart.reduce((acc, item) => acc + item.qtty, 0);
    document.querySelector('.menu-openner span').innerHTML = cartQtty
}

//ATRIBUI AOS BOTÕES QUE FECHAM O MODAL DE SELEÇÃO DE PIZZA O EVENTO DE FECHÁ-LO
['.pizzaInfo--cancelButton', '.pizzaInfo--cancelMobileButton'].forEach(e => {
    pizzaWindowArea.querySelector(e).addEventListener('click', (e) => {
        e.preventDefault();
        closeModalPizza();
    });
});

//SE ENCONTRAR O JSON DE PIZZAS E ESTIVER PREENCHIDO
if(pizzaJson.length > 0){

    //PREENCHE A TELA INICIAL COM AS PIZZAS DO JSON PROVENIENTE DO ARQUIVO PIZZAS.JS
    //ADICIONA O EVENTO DE CLICK EM CADA UMA PARA ABRIR O MODAL COM OS RESPECTIVOS DADOS
    pizzaJson.map((pizza)=>{        
        let pizzaContainer = document.querySelector('.pizza-item').cloneNode(true)        
        pizzaContainer.setAttribute('data-key', pizza.id)
        pizzaContainer.querySelector('.pizza-item--img img').src = pizza.img
        pizzaContainer.querySelector('.pizza-item--price').innerHTML = priceBr(pizza.price)
        pizzaContainer.querySelector('.pizza-item--name').innerHTML = pizza.name
        pizzaContainer.querySelector('.pizza-item--desc').innerHTML = pizza.description              
        pizzaContainer.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault()            
            openModalPizza(pizza)
        })         
        document.querySelector('.pizza-area').append(pizzaContainer)
    })

    //INICIA A QUANTIDADE DO CARRINHO NO HEADER
    document.querySelector('header span').innerHTML = cartQtty

    //ADICIONA O EVENTO DE CLICK NOS BOTÕES DE SELEÇÃO DE TAMANHO DA PIZZA NO MODAL DA SELEÇÃO DA PIZZA
    pizzaWindowArea.querySelectorAll('.pizzaInfo--size').forEach(e => {        
        e.addEventListener('click', (e2) => {
            e2.preventDefault()
            pizzaWindowArea.querySelector('.pizzaInfo--size.selected') ? pizzaWindowArea.querySelector('.pizzaInfo--size.selected').classList.remove('selected') : null
            e.classList.add('selected')
        })
    })

    //ADICIONA O EVENTO DE CLICK NO BOTÃO DE SELEÇÃO DE MENOS QUANTIDADE DE PIZZAS NO MODAL DA SELEÇÃO DA PIZZA
    //DECREMENTA O CÁLCULO DO PREÇO TOTAL EM RELAÇÃO A QUANTIDADE SELECIONADA
    pizzaWindowArea.querySelector('.pizzaInfo--qtmenos').addEventListener('click', (e) => {
        let pizzaId = parseInt(e.target.closest('.pizzaWindowArea').getAttribute('data-key'))
        let pizza = pizzaJson.find(item => item.id === pizzaId)
        let n = parseInt(pizzaWindowArea.querySelector('.pizzaInfo--qt').innerHTML)
        if(n > 1){
            pizzaWindowArea.querySelector('.pizzaInfo--qt').innerHTML = --n
            pizzaWindowArea.querySelector('.pizzaInfo--actualPrice').innerHTML = priceBr(n * pizza.price)
        }
        updateCartNumber()
    })

    //ADICIONA O EVENTO DE CLICK NO BOTÃO DE SELEÇÃO DE MAIS QUANTIDADE DE PIZZAS NO MODAL DA SELEÇÃO DA PIZZA
    //INCREMENTA O CÁLCULO DO PREÇO TOTAL EM RELAÇÃO A QUANTIDADE SELECIONADA
    pizzaWindowArea.querySelector('.pizzaInfo--qtmais').addEventListener('click', (e) => {
        let pizzaId = parseInt(e.target.closest('.pizzaWindowArea').getAttribute('data-key'))
        let pizza = pizzaJson.find(item => item.id === pizzaId)
        let n = parseInt(pizzaWindowArea.querySelector('.pizzaInfo--qt').innerHTML)     
        pizzaWindowArea.querySelector('.pizzaInfo--qt').innerHTML = ++n
        pizzaWindowArea.querySelector('.pizzaInfo--actualPrice').innerHTML = priceBr(n * pizza.price)
        updateCartNumber()
    })

    //ADICIONA O EVENTO DE CLICK NO BOTÃO DE ADICIONAR AO CARRINHO
    //ADICIONA OS DADOS DO MODAL NO JSON DO CARRINHO
    pizzaWindowArea.querySelector('.pizzaInfo--addButton').addEventListener('click', (e) => {
        let pizzaId = parseInt(e.target.closest('.pizzaWindowArea').getAttribute('data-key'))
        let pizza = pizzaJson.find(item => item.id === pizzaId)
        let pizzaQtty = parseInt(pizzaWindowArea.querySelector('.pizzaInfo--qt').innerHTML)
        let pizzaSize = parseInt(pizzaWindowArea.querySelector('.pizzaInfo--size.selected').getAttribute('data-key'))
        let existingPizza = cart.find(item => item.identifier === `${pizzaId}@${pizzaSize}`);
        if(existingPizza){
            existingPizza.qtty += pizzaQtty
        } else {
            cart.push({
                "id": pizzaId,
                "identifier": `${pizzaId}@${pizzaSize}`,
                "pizza": pizza,
                "qtty": pizzaQtty,
                "size": pizzaSize
            })
        }
        updateCartNumber()
        closeModalPizza()
        openCart()
    })

    //ADICIONA O EVENTO DE CLICK NO BOTÃO DO CARRINHO QUE ABRE A LISTA
    document.querySelector('.menu-openner').addEventListener('click', () => {
        openCart()
    })

    //ADICIONA O EVENTO DE CLICK NO BOTÃO DO CARRINHO QUE FECHA A LISTA
    document.querySelector('.menu-closer').addEventListener('click', () => {
        closeCart()
    })

    //ADICIONA O EVENTO DE CLICK NO BOTÃO DE FINALIZAR A COMPRA
    document.querySelector('.cart--finalizar').addEventListener('click', () => {
        alert("Seu pedido já está sendo preparado e logo sairá para a entrega. Obrigado pela preferencia.")
        location.reload()
    })    

//SE NÃO ENCONTRAR O JSON OU SE ESTIVER VAZIO AVISA QUE ESTAMOS SEM PIZZA
} else {
    document.querySelector('.pizza-area').innerHTML = "Malz ae, estamos sem pizza hoje. Passa amanhã, amanhã teremos mais pizzas."
}