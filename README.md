This package is not endorsed by Ken Adams.

```javascript
var mscd = require('commonform-mscd')
var assert = require('assert')
var form = {content: ['This contract is void ab initio.']}
assert.deepEqual(
  mscd(form),
  [
    {
      level: 'info',
      message: (
        'Use standard English instead of "ab initio".' +
        ' See MSCD 13.376-13.377.'
      ),
      path: ['content', 0],
      source: 'commonform-mscd',
      url: null
    }
  ]
)
```
