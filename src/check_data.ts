
import { allProducts } from './data/products/index';
import * as fs from 'fs';

const log = (msg: string) => {
  console.log(msg);
  fs.appendFileSync('check_result.txt', msg + '\n');
};

log('Checking ' + allProducts.length + ' products...');

const errors: string[] = [];
const ids = new Set<string>();

allProducts.forEach((p, i) => {
  if (!p) {
    errors.push(`Product at index ${i} is undefined/null`);
    return;
  }
  
  if (!p.id) {
    errors.push(`Product at index ${i} missing id`);
  } else {
    if (ids.has(p.id)) {
      errors.push(`Duplicate product ID: ${p.id}`);
    }
    ids.add(p.id);
  }

  if (!p.title) errors.push(`Product ${p.id || i} missing title`);
  if (!p.shortDesc) errors.push(`Product ${p.id || i} missing shortDesc`);
  if (!p.brand) errors.push(`Product ${p.id || i} missing brand`);
  if (!p.price) errors.push(`Product ${p.id || i} missing price`);
  if (!p.warranty) errors.push(`Product ${p.id || i} missing warranty`);

  if (!p.image) errors.push(`Product ${p.id || i} missing image`);
  if (!p.leadTime) errors.push(`Product ${p.id || i} missing leadTime`);

  if (!p.features) {
    errors.push(`Product ${p.id || i} missing features`);
  } else if (!Array.isArray(p.features)) {
    errors.push(`Product ${p.id || i} features is not an array`);
  } else {
    p.features.forEach((f, fi) => {
      if (typeof f !== 'string') errors.push(`Product ${p.id || i} feature at ${fi} is not a string`);
    });
  }

  if (p.applications) {
    if (!Array.isArray(p.applications)) {
      errors.push(`Product ${p.id || i} applications is not an array`);
    } else {
      p.applications.forEach((a, ai) => {
        if (typeof a !== 'string') errors.push(`Product ${p.id || i} application at ${ai} is not a string`);
      });
    }
  }

  if (p.description && typeof p.description !== 'string') {
    errors.push(`Product ${p.id || i} description is not a string`);
  }
  
  // Check fields accessed with methods in page.tsx
  if (!p.category) {
    errors.push(`Product ${p.id || i} missing category`);
  } else {
    try {
      p.category.replace('-', ' ');
    } catch (e) {
      errors.push(`Product ${p.id || i} category.replace failed: ${e}`);
    }
  }

  if (!p.moq) {
    errors.push(`Product ${p.id || i} missing moq`);
  } else {
    try {
      p.moq.split(' ');
    } catch (e) {
      errors.push(`Product ${p.id || i} moq.split failed: ${e}`);
    }
  }

  if (p.capacity) {
    try {
      p.capacity.split(' ');
    } catch (e) {
      errors.push(`Product ${p.id || i} capacity.split failed: ${e}`);
    }
  }

  if (p.efficiency) {
    try {
      p.efficiency.split(' ');
    } catch (e) {
      errors.push(`Product ${p.id || i} efficiency.split failed: ${e}`);
    }
  }
});

if (errors.length > 0) {
  log('Found errors:');
  errors.forEach(e => log(e));
  process.exit(1);
} else {
  log('All products look valid.');
}
