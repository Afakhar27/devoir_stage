/* eslint-disable */
// @ts-nocheck
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const agenciesCsvPath = path.join(__dirname, '../agencies_agency_rows.csv');
const contactsCsvPath = path.join(__dirname, '../contacts_contact_rows.csv');
const agenciesJsonPath = path.join(__dirname, '../src/data/agences.json');
const contactsJsonPath = path.join(__dirname, '../src/data/contacts.json');

try {
    console.log('Reading CSV files...');
    const agenciesContent = fs.readFileSync(agenciesCsvPath, 'utf8');
    const contactsContent = fs.readFileSync(contactsCsvPath, 'utf8');

    console.log('Parsing CSV data...');
    const agenciesRaw = parse(agenciesContent, {
        columns: true,
        skip_empty_lines: true
    });
    const contactsRaw = parse(contactsContent, {
        columns: true,
        skip_empty_lines: true
    });

    console.log(`Found ${agenciesRaw.length} agencies and ${contactsRaw.length} contacts.`);

    // Keep all fields as requested by the user
    const agencies = agenciesRaw;
    const contacts = contactsRaw;

    console.log('Writing JSON files...');
    fs.writeFileSync(agenciesJsonPath, JSON.stringify(agencies, null, 2));
    fs.writeFileSync(contactsJsonPath, JSON.stringify(contacts, null, 2));

    console.log('Data import completed successfully!');

} catch (error) {
    console.error('Error importing data:', error);
}
