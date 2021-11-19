/**
 * Information needed to read values from a given Airtable table.
 */
interface FromAirtableProps extends DesignTokenConfig {
  apiKey: string;
  base: string;
  table: string;
  view: string;
}

export const createAirtableQueryString = (props: FromAirtableProps) => {
  const {
    base,
    view,
    table,
    tokenField,
    propFields
  } = props;

  /**
   * Select all propFields and the tokenField.
   */
  const fields = [tokenField, ...propFields];
  /**
   * Read the specific table from the given view in the given base. Remove
   * entries with an empty tokenField.
   */
  let url = `https://api.airtable.com/v0/${base}/${table}?view=${view}&filterByFormula={${tokenField}} != ""`;
  /**
   * Select the propFields and tokenField.
   */
  for (const field of fields) {
    url += `&fields[]=${field}`;
  }

  return url;
}

export const fromAirtable: DesignTokenProvider<FromAirtableProps> = async (props: FromAirtableProps) => {
  const designTokens: DesignToken[] = [];
  const url = createAirtableQueryString(props);
  const { tokenField, apiKey } = props;

  const tableRequest = await fetch(encodeURI(url), {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const { records } = await tableRequest.json();

  for (const record of records) {
    const designTokenId = record.fields[tokenField]?.toString();
    const designTokenProps: DesignTokenProps = {};
    if (!designTokenId) continue;
    /**
     * Iterate over propFields and read the values from the retrieved records.
     */
    Object.assign(designTokenProps, record.fields);
    /**
     * Push the parsed designToken.
     */
    designTokens.push({
      id: designTokenId,
      props: designTokenProps,
    });
  }

  return designTokens;
}