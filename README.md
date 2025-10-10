# Fiber UI

<div align="center">
  <p>
    <strong>Beautiful, accessible, and customizable React components built with React Aria and Tailwind CSS.</strong>
  </p>
  <br />
  <p>
    <a href="https://github.com/YOUR_USERNAME/YOUR_REPO/actions">
      <img alt="Build Status" src="https://img.shields.io/github/actions/workflow/status/YOUR_USERNAME/YOUR_REPO/ci.yml?branch=main&style=flat-square" />
    </a>
    <a href="https://www.npmjs.com/package/fiber-ui">
      <img alt="NPM Version" src="https://img.shields.io/npm/v/fiber-ui?style=flat-square" />
    </a>
    <a href="https://opensource.org/licenses/MIT">
      <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" />
    </a>
  </p>
</div>

---

## What is Fiber UI?

Fiber UI is an open-source component library for React, designed for accessibility and elegance. It leverages the power of [**React Aria**](https://react-spectrum.adobe.com/react-aria/) for accessibility and behavior, and [**Tailwind CSS**](https://tailwindcss.com/) for styling.

Our goal is to provide a set of **beautiful, unstyled components** that you can easily copy and paste into your projects. You own the code, so you can customize it to fit your design system perfectly.

This is not a component library in the traditional sense. It's a collection of reusable components that you can fully control.

---

## The Philosophy

- **Built for Customization:** Components are designed to be easily modified and extended.
- **Accessibility First:** Using React Aria, all components are accessible out-of-the-box, following WAI-ARIA standards.
- **Developer Experience:** A simple CLI to add components to your project without extra dependencies.

---

## Monorepo Structure

This project is a monorepo managed by [**Turborepo**](https://turbo.build/repo).

- `apps/web`: The landing page and main website (`fiberui.com`).
- `apps/docs`: Documentation for components (`docs.fiberui.com`).
- `packages/ui`: The core Fiber UI components.
- `packages/cli`: Command-line interface for adding components.

---

## Command-Line Interface (CLI)

We are developing a CLI tool, similar to `shadcn/ui`, to make it easy to integrate Fiber UI components into your projects.

The CLI will handle adding components, installing dependencies, and configuring `tailwind.config.js` for you.

**Usage (Coming Soon):**

```bash
npx fibercli add [component-name]
```

---

## Getting Started

> Note: The project is currently under active development. The documentation and CLI are coming soon!

Instructions on how to run the project locally will be available here shortly.

---

## Contributing

We welcome contributions from the community! If you're interested in helping build Fiber UI, please check out our contributing guidelines (coming soon) and feel free to open an issue or pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE.md) file for details.

---

## Stay Updated

You can subscribe for updates or follow the progress of Fiber UI:

- Website: [fiberui.com](https://fiberui.com)
- GitHub: [rajatverma311201/fiberui](https://github.com/rajatverma311201/fiberui)
- NPM: [fibercli](https://www.npmjs.com/package/fibercli)
