export const query = <T = any>(sql: string, values?: any[]): Promise<T[]> => {
    return global.exports.oxmysql.query(sql, values);
  };
  