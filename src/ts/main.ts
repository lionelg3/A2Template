import {Component} from 'angular2/core'
import {bootstrap} from 'angular2/platform/browser'

@Component({
    selector: 'main',
    template: `
        <h1>OK ca marche super</h1>
    `
})
class Main {}

bootstrap(Main, []);