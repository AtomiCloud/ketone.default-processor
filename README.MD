# CyanPrint Processor cyan/default

CyanPrint default processor

## Usage

To use this processor, add it to `cyan.yaml`:

```yaml
processors:
  - cyan/default
```

Please convert this to any language you need.

The schema for this processor for Cyan is:

```javascript
function template() {
    return {
        processors: [
            {
                name: "cyan/default",
                // Add your glob here
                files: [],
                // Configuration
                config: {
                    vars: {
                        // Key-value pairs that use in the template. Nesting allowed
                        name: "CyanPrint"
                    },
                    // this is optional
                    parser: {
                        // this optional. the following example is the default
                        varSyntax: [
                            ["var__", "__"],
                        ]
                    }
                }
            }
        ],
        plugins: [],
    }
}
```

## Contributors
- [ernest@atomi.cloud](mailto:ernest@atomi.cloud)
