const liquibase = require('../config/liquibase.config');

async function runMigrations() {
  try {
    const result = await liquibase.update();
    console.log("✅ Database updated successfully!");
  } catch (err) {
    console.error("❌ Liquibase migration failed:", err);
  }
}

runMigrations();