import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();

function readVariable(filePath, variableName) {
  const sourceText = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let initializer;

  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    for (const declaration of node.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === variableName) {
        initializer = declaration.initializer;
      }
    }
  });

  if (!initializer) {
    throw new Error(`Could not find ${variableName} in ${filePath}`);
  }
  return readNode(initializer);
}

function readNode(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isIdentifier(node)) return node.text;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(readNode);
  if (ts.isObjectLiteralExpression(node)) {
    return Object.fromEntries(node.properties.map((property) => {
      if (!ts.isPropertyAssignment(property)) {
        throw new Error(`Unsupported object property: ${property.getText()}`);
      }
      const name = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
        ? property.name.text
        : property.name.getText();
      return [name, readNode(property.initializer)];
    }));
  }
  throw new Error(`Unsupported syntax: ${node.getText()}`);
}

const services = readVariable(path.join(root, 'src/data/services.ts'), 'serviceCategories').map((service, index) => ({
  slug: service.slug,
  title: service.title,
  icon: service.icon,
  color: service.color,
  section: service.section,
  tagline: service.tagline,
  description: service.description,
  meta_title: service.metaTitle,
  meta_description: service.metaDescription,
  sort_order: index,
  is_active: true,
  items: service.items.map((item, itemIndex) => ({
    icon: item.icon,
    name: item.name,
    description: item.description,
    sort_order: itemIndex,
    is_active: true,
  })),
}));

const packages = readVariable(path.join(root, 'src/data/packages.ts'), 'defaultPackages').map((item, index) => ({
  name: item.name,
  tagline: item.tagline,
  color: item.color,
  is_popular: item.popular || false,
  features: item.features,
  sort_order: index,
  is_active: true,
}));

const destination = path.join(root, 'backend/app/default_content.json');
fs.writeFileSync(destination, `${JSON.stringify({ services, packages }, null, 2)}\n`);
console.log(`Wrote ${destination}`);
