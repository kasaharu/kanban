export enum ErrorTypeEnum {
  OverSectionNameLength = 'over_section_name_length',
}

export const mappingErrorMessage = {
  [ErrorTypeEnum.OverSectionNameLength]: 'セクション名は 1 ~ 15 文字で設定してください',
};
