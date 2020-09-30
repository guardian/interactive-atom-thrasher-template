// import mainHTML from "./atoms/default/server/templates/main.html!text"

// export async function render() {
//     return mainHTML;
// } 

import mainTemplate from "./atoms/default/server/templates/main.html!text"
import Mustache from 'mustache'
import rp from 'request-promise'

export function render() {
    return rp({
        uri: 'https://interactive.guim.co.uk/docsdata-test/1bnJQR3VmiQLAsCr5PdYoqae5ZJRtQeyZvgJsUaTuM1E.json',
        json: true
    }).then((data) => {
        var sheets = data.sheets;
        console.log(sheets);
        var html = Mustache.render(mainTemplate, sheets);
        return html;
    });
}