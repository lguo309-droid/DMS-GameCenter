const filterButtons = document.querySelectorAll('.filter-btn');
const gameCards = document.querySelectorAll('.game-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    gameCards.forEach(card => {
      const cardType = card.getAttribute('data-type');
      
      if (filterValue === 'all' || filterValue === cardType) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
