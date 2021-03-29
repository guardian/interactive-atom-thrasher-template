import mainHTML from "./atoms/default/server/templates/main.html!text"

export async function render() {
    return mainHTML;
} 


// import mainTemplate from "./atoms/default/server/templates/main.html!text"
// import Mustache from 'mustache'
// import rp from 'request-promise'

// export function render() {
//     return rp({
//         uri: 'https://interactive.guim.co.uk/docsdata-test/1QkO66GhLFBKPtaNGhzNtDQfoxCxpbBAi4tK8IpkVE6Y.json',
//         json: true
//     }).then((data) => {
//         var sheets = data.sheets;
//         console.log(sheets);
//         var html = Mustache.render(mainTemplate, sheets);
//         return html;
//     });
// }