const climateBlockIds = [
    'climate-crisis',
    'climate-fight',
    'climate-hope',
];

const buttons = document.getElementsByClassName('thrasher-button');

for (let button of buttons) {
    button.addEventListener('click', function() {
        const id = button.getAttribute('id').replace('__button', '');
        document.getElementById(id).style.display = 'block';
        // + apply styling

        climateBlockIds.forEach(blockId => {
            if (blockId !== id) {
                document.getElementById(blockId).style.display = 'none';
                // change text to grey
                // change bg colour
            }
        })
    })
}
