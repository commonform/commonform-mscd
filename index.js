var mscd = require('mscd')
var regexpAnnotator = require('commonform-regexp-annotator')

function citationList(list) {
  return list.join('; ') }

function entryMessage(entry) {
  return (
    entry.comment +
    ( entry.citations ?
      ( ' See ' + citationList(entry.citations) + '.' ) : '' ) +
    ( entry.sections ?
      ( ' See MSCD ' + citationList(entry.sections) + '.' ) : '' )) }

var annotators = mscd
  .map(function(entry) {
    var message = entryMessage(entry)
    return regexpAnnotator(
      entry.phrases.map(function(phrase) {
        return new RegExp(phrase, 'i') }),
      function(form, path) {
        return {
          message: message,
          path: path,
          source: 'commonform-mscd',
          url: null } }) })

function commonformMSCD(form) {
  return annotators
    .map(function(annotator) {
      return annotator(form) })
    .reduce(
      function(result, annotations) {
        return result.concat(annotations) },
      [ ]) }

module.exports = commonformMSCD
