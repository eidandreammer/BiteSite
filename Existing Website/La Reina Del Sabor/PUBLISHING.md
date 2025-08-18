# Publishing Guide for La Reina Del Sabor NPM Package

This guide will walk you through the process of publishing the La Reina Del Sabor package to the npm registry.

## Prerequisites

1. **Node.js and npm**: Make sure you have Node.js 16+ and npm 8+ installed
2. **npm account**: You need an npm account to publish packages
3. **Git repository**: Your code should be in a Git repository

## Step 1: Login to npm

```bash
npm login
```

Enter your npm username, password, and email when prompted.

## Step 2: Update Package Information

Before publishing, make sure to update the following in `package.json`:

- **Repository URL**: Update the `repository.url` field with your actual GitHub repository
- **Author**: Update the `author` field with your information
- **Version**: Ensure the version number is appropriate (follow semantic versioning)

## Step 3: Build the Package

```bash
npm run build:package
```

This will compile your TypeScript components to JavaScript and generate type definitions in the `dist/` folder.

## Step 4: Test the Build

```bash
npm pack
```

This creates a `.tgz` file that you can inspect to ensure all the right files are included.

## Step 5: Publish to npm

```bash
npm publish
```

If this is your first time publishing this package, it will be published immediately. For subsequent updates, you'll need to increment the version number.

## Step 6: Verify Publication

Check your package on npm:
- Visit: https://www.npmjs.com/package/la-reina-del-sabor
- Verify all files are included correctly
- Test installation in a new project

## Updating the Package

When you make changes and want to publish an update:

1. **Update version**: Use one of these commands:
   ```bash
   npm version patch    # 1.0.0 → 1.0.1 (bug fixes)
   npm version minor    # 1.0.0 → 1.1.0 (new features)
   npm version major    # 1.0.0 → 2.0.0 (breaking changes)
   ```

2. **Build and publish**:
   ```bash
   npm run build:package
   npm publish
   ```

## Publishing to GitHub Packages (Alternative)

If you prefer to publish to GitHub Packages instead of npm:

1. **Update package.json**:
   ```json
   {
     "name": "@yourusername/la-reina-del-sabor",
     "publishConfig": {
       "registry": "https://npm.pkg.github.com"
     }
   }
   ```

2. **Login to GitHub Packages**:
   ```bash
   npm login --registry=https://npm.pkg.github.com
   ```

3. **Publish**:
   ```bash
   npm publish
   ```

## Troubleshooting

### Common Issues

1. **Package name already taken**: Choose a different package name
2. **Build errors**: Check TypeScript compilation errors
3. **Missing files**: Verify `.npmignore` and `files` field in package.json
4. **Authentication errors**: Re-run `npm login`

### Checking Package Contents

```bash
# See what files will be included
npm pack --dry-run

# Extract and inspect the package
tar -tzf la-reina-del-sabor-1.0.0.tgz
```

### Unpublishing (if needed)

⚠️ **Warning**: You can only unpublish a package within 72 hours of publishing, and only if no other packages depend on it.

```bash
npm unpublish la-reina-del-sabor@1.0.0
```

## Best Practices

1. **Semantic Versioning**: Follow semver.org guidelines
2. **Changelog**: Keep a CHANGELOG.md file
3. **Testing**: Test your package before publishing
4. **Documentation**: Keep README.md updated
5. **Examples**: Provide clear usage examples

## Next Steps

After publishing:

1. **Update your repository** with the new version
2. **Create a release** on GitHub with release notes
3. **Share** your package with the community
4. **Monitor** for issues and feedback

## Support

If you encounter issues:

1. Check the npm documentation: https://docs.npmjs.com/
2. Review npm publishing guidelines: https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
3. Check the npm status page: https://status.npmjs.org/

---

**Happy Publishing! 🚀**
