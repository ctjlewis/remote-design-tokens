import Airtable from "airtable";

interface FromAirtableProps extends DesignTokenConfig {
  apiKey: string;
  base: string;
  table: string;
}

export const fromAirtable: DesignTokenProvider<FromAirtableProps> = async ({
  apiKey,
  base,
  table,
  tokenField,
  propFields
}: FromAirtableProps) => {
  const designTokens: DesignToken[] = [];
  const fields = [tokenField, ...propFields];

  const airtable = new Airtable({
    apiKey,
  }).base(base).table(table);

  await airtable.select({
    fields,
    filterByFormula: `{${tokenField}} != ""`,
  }).eachPage((records, nextPage) => {
    for (const record of records) {
      const designTokenId = record.get(tokenField)?.toString();
      if (!designTokenId) continue;

      const designTokenProps: DesignTokenProps = {};
      for (const field of propFields) {
        const value = record.get(field);
        if (!value) continue;

        designTokenProps[field] = value;
      }

      const designToken: DesignToken = {
        id: designTokenId,
        props: designTokenProps,
      };

      designTokens.push(designToken);
    }

    nextPage();
  });

  return designTokens;
}