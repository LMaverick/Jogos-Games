document.addEventListener('DOMContentLoaded', () => {

    //card options
    const cardArray = [
     {
         name: 'fries' ,
         img: 'img/fries.png'
     },
     {
         name: 'fries' ,
         img: 'img/fries.png'
     },
     {
         name: 'cheeseburger' ,
         img: 'img/cheeseburger.png'
     },
     {
         name: 'cheeseburger' ,
         img: 'img/cheeseburger.png'
     },
     {
         name: 'hotdog' ,
         img: 'img/hotdog.png'
     },
     {
         name: 'hotdog' ,
         img: 'img/hotdog.png'
     },
     {
         name: 'ice-cream' ,
         img: 'img/ice-cream.png'
     },
     {
         name: 'ice-cream' ,
         img: 'img/ice-cream.png'
     },
     {
         name: 'milkshake' ,
         img: 'img/milkshake.png'
     },
     {
         name: 'milkshake' ,
         img: 'img/milkshake.png'
     },
     {
         name: 'pizza' ,
         img: 'img/pizza.png'
     },
     {
         name: 'pizza' ,
         img: 'img/pizza.png'
     }

    ]

    const grid = document.querySelector('.grid')

   //create your board
   function createBoard() {
       for (let i = 0; i < cardArray.length; i++) {
           var card = document.createElement('img')
           card.setAttribute('scr', 'img/blank.png')
           card.setAttribute('data-id', i)
           //card.addEventListener('click', flipcard)
           grid.appendChild(card)

       }
   } 

   createBoard()

})