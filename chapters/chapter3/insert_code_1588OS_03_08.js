scope.events = [
  {title: 'All Day Event',start: new Date(y, m, 1),url: 'http://www.angularjs.org'},
  {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
  {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
  {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: true}];
  $scope.eventSources = [$scope.events];