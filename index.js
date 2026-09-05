import escape from 'escape-regexp'
import regexpAnnotator from 'commonform-regexp-annotator'
import mscdData from 'mscd' with { type: 'json' }

const mscd = mscdData.filter(function (element) {
  return element.phrases.indexOf('agreement') < 0
})

function sectionString (section) {
  return (
    typeof section === 'string'
      ? section
      : (section.from + '-' + section.through)
  )
}

function citationList (list) {
  return list.map(sectionString)
    .join('; ')
}

function entryMessage (entry) {
  return (
    entry.comment +
    (
      entry.citations
        ? (' See ' + citationList(entry.citations) + '.')
        : ''
    ) +
    (
      entry.sections
        ? (' See MSCD ' + citationList(entry.sections) + '.')
        : ''
    )
  )
}

const annotators = mscd.map(function (entry) {
  const message = entryMessage(entry)
  return regexpAnnotator(
    entry.phrases.map(function (phrase) {
      if (typeof phrase === 'string') {
        return new RegExp(('\\b' + escape(phrase) + '\\b'), 'i')
      } else {
        return new RegExp(phrase.re, 'i')
      }
    }),
    function (form, path) {
      return {
        level: 'info',
        message,
        path,
        source: 'commonform-mscd',
        url: null
      }
    }
  )
})

export default function commonformMSCD (form) {
  return annotators
    .map(function (annotator) {
      return annotator(form)
    })
    .reduce(function (result, annotations) {
      return result.concat(annotations)
    }, [])
}
