import {trigger,state,style,animate,transition,query,stagger} from '@angular/animations';

export let hoverZoom = trigger('zoom', [
  state('in', style({
    transform: 'scale(1.05)'
  })),
  state('out', style({
    transform: 'scale(1)'
  })),
  transition('in <=> out',[
    animate('100ms')
  ])
])

export let fade = trigger('fade', [
  state('in', style({
    opacity: 1
  })),
  state('out', style({
    opacity: 0
  })),
  transition('in <=> out',[
    animate('100ms')
  ])
])

export let listAnimation = trigger('listAnimation', [
    transition('* <=> *', [
      query(':enter', [
        style({ opacity: 0 }), 
        stagger('100ms', animate('600ms ease-out', style({ opacity: 1 })))],
        { optional: true }
      ),
      query(':leave',
        animate('200ms', style({ opacity: 0 })),
        { optional: true }
      )
    ])
  ])