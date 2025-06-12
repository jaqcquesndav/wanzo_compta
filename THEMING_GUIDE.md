# Theming Refactoring Guide

This guide provides instructions for refactoring hardcoded colors to use the semantic theme classes throughout the application.

## Text Colors
Replace these hardcoded text colors with semantic theme classes:

- `text-gray-900` → `text-text-primary`
- `text-gray-700`, `text-gray-800` → `text-text-primary` 
- `text-gray-600`, `text-gray-500` → `text-text-secondary`
- `text-gray-400` → `text-text-tertiary`
- `text-white` (on colored backgrounds) → `text-on-primary`
- `text-primary` (remain as is)
- `text-success` (remain as is)
- `text-warning` (remain as is)
- `text-red-500`, `text-red-600` → `text-destructive`

## Background Colors
Replace these hardcoded background colors with semantic theme classes:

- `bg-white` → `bg-primary`
- `bg-gray-50`, `bg-gray-100` → `bg-secondary`
- `bg-gray-200` → `bg-tertiary`
- `hover:bg-gray-50`, `hover:bg-gray-100` → `hover:bg-hover`
- `bg-primary` (remain as is)
- `bg-success` (remain as is)
- `bg-warning` (remain as is)
- `bg-red-500` → `bg-destructive`

## Border Colors
Replace these hardcoded border colors with semantic theme classes:

- `border-gray-200` → `border-primary`
- `border-gray-300` → `border-secondary`
- `border-primary` (remain as is)

## Dark Mode Classes
Remove all explicit dark mode variants and let CSS variables handle theme switching:

- Remove `dark:text-white`, `dark:text-gray-300`, etc.
- Remove `dark:bg-dark-primary`, `dark:bg-dark-secondary`, etc.
- Remove `dark:border-dark-DEFAULT`, etc.

## Component Classes
Use the semantic component classes that were defined in globals.css:

- Use `.card`, `.card-header`, `.card-body` for card styling
- Use `.form-input`, `.form-select`, `.form-textarea` for form controls
- Use `.table`, `th`, `td`, `tr` with appropriate theme classes
- Use `.btn-primary`, `.btn-secondary`, etc. for buttons
- Use `.modal`, `.modal-header`, `.modal-body` for modals

## Examples

### Before:
```tsx
<div className="bg-white dark:bg-dark-primary rounded-lg shadow p-4">
  <h3 className="text-gray-900 dark:text-white font-medium">Title</h3>
  <p className="text-gray-500 dark:text-gray-400">Description text</p>
  <div className="border-t border-gray-200 dark:border-dark-DEFAULT mt-4 pt-4">
    <button className="bg-primary text-white px-4 py-2 rounded">
      Action
    </button>
  </div>
</div>
```

### After:
```tsx
<div className="card">
  <h3 className="text-text-primary font-medium">Title</h3>
  <p className="text-text-secondary">Description text</p>
  <div className="border-t border-primary mt-4 pt-4">
    <button className="btn-primary">
      Action
    </button>
  </div>
</div>
```

This approach ensures consistent theming across the application and proper light/dark mode support without repetitive `dark:` variants.
