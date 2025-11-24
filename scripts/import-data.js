const fs = require('fs');
const path = require('path');

const agenciesCsvPath = path.join(__dirname, '../agencies_agency_rows.csv');
const contactsCsvPath = path.join(__dirname, '../contacts_contact_rows.csv');
const agenciesJsonPath = path.join(__dirname, '../src/data/agences.json');
const contactsJsonPath = path.join(__dirname, '../src/data/contacts.json');

function parseCsv(content) {
    const lines = content.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Handle quotes if necessary, but for now simple split
        // A better regex for CSV splitting: /,(?=(?:(?:[^"]*"){2})*[^"]*$)/
        const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
        
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] || '';
        });
        result.push(obj);
    }
    return result;
}

try {
    console.log('Reading CSV files...');
    const agenciesContent = fs.readFileSync(agenciesCsvPath, 'utf8');
    const contactsContent = fs.readFileSync(contactsCsvPath, 'utf8');

    console.log('Parsing CSV data...');
    const agenciesRaw = parseCsv(agenciesContent);
    const contactsRaw = parseCsv(contactsContent);

    console.log(`Found ${agenciesRaw.length} agencies and ${contactsRaw.length} contacts.`);

    // Map to French keys as used in the application
    const agencies = agenciesRaw.map(a => ({
        id: a.id,
        nom: a.name,
        ville: a.name, // Using name as city/ville
        region: a.state
    }));

    const contacts = contactsRaw.map(c => ({
        id: c.id,
        nom: c.last_name,
        prenom: c.first_name,
        email: c.email,
        telephone: c.phone,
        poste: c.title,
        agenceId: c.agency_id
    }));

    console.log('Writing JSON files...');
    fs.writeFileSync(agenciesJsonPath, JSON.stringify(agencies, null, 2));
    fs.writeFileSync(contactsJsonPath, JSON.stringify(contacts, null, 2));

    console.log('Data import completed successfully!');

} catch (error) {
    console.error('Error importing data:', error);
}
