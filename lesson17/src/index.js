import _ from 'lodash'
import $ from 'jquery'

const dom = $('div')
dom.html( _.join(['y','kk']), '-----')
$('body').append(dom)