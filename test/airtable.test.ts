import { fromAirtable } from '../src/providers/airtable'

const apiKey = process.env.AIRTABLE_KEY ?? "";
const base = process.env.AIRTABLE_BASE ?? "";

describe('Airtable provider', () => {
  test('should load from test table', async () => {
    const tokens = await fromAirtable({
      apiKey,
      base,
      table: "Icons",
      tokenField: "iconXIDd",
      propFields: ["icon", "vector"],
    });

    console.log({ tokens })

    expect(tokens.length).toBeTruthy();
  })
});