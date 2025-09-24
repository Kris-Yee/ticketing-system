# Server Commands Guide

## Database Commands

### Create Database
```bash
npm run db:create
```
Creates the database specified in config/config.json

### Run Migrations
```bash
npm run db:migrate
```
Runs all pending migrations to update database schema

### Undo Last Migration
```bash
npm run db:undo
```
Reverts the last migration

### Run Seeds
```bash
npm run db:seed
```
Runs all seed files to populate database with initial data

## Model and Migration Generation

### Generate Model with Migration
```bash
npm run model -- --name ModelName --attributes field1:type,field2:type
```
Example:
```bash
npm run model -- --name tb_action --attributes actionName:string,module:string
```

### Generate Migration Only
```bash
npm run db:update -- migration-name
```
Example:
```bash
npm run db:update -- add-user-fields
```

## Test Commands

### Run Tests
```bash
npm test
```
Currently configured to show test setup message

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Create database:
```bash
npm run db:create
```

3. Run migrations:
```bash
npm run db:migrate
```

4. Run seeds:
```bash
npm run db:seed
```

## Database Configuration

Database configuration is located in `config/config.json`. Make sure to update the database credentials before running any database commands.