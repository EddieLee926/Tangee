import * as yup from 'yup';

const getValidateDate = () => {
    return new Date(new Date().setFullYear(new Date().getFullYear() - 20));
};

// validation for normal mem register
const normalValidationSchema = [
    // step1
    yup.object().shape({
        name: yup.string().required('姓名是必填欄位'),
        nick_name: yup
            .string()
            .required('暱稱是必填欄位')
            .min(2, '暱稱需多於2個字元')
            .max(10, '暱稱需少於10個字元'),
        gender: yup.string().required('性別是必填欄位'),
        // need to modify
        birth: yup
            .date()
            .required('請選擇您的生日')
            .max(getValidateDate(), '您須年滿20歲'),
        email: yup.string().required('Email是必填欄位').email('Email無效'),
        account: yup
            .string()
            .required('帳號是必填欄位')
            .min(2, '帳號需多於2個字元')
            .max(10, '帳號需少於10個字元'),
        password: yup
            .string()
            .required('密碼是必填欄位')
            .min(6, '密碼需多於6個字元')
            .max(40, '密碼需少於40個字元'),
    }),
    // step2 (optional, leave it blank)
    yup.object().shape({}),

    // step3
    yup.object().shape({}),
    // step4
    yup.object().shape({}),
];

// validation for star register
const starValidationSchema = [
    // step1
    yup.object().shape({
        name: yup.string().required('姓名是必填欄位'),
        nick_name: yup
            .string()
            .required('暱稱是必填欄位')
            .min(2, '暱稱需多於2個字元')
            .max(10, '暱稱需少於10個字元'),
        gender: yup.string().required('性別是必填欄位'),
        // need to modify
        birth: yup
            .date()
            .max(getValidateDate(), '您須年滿20歲')
            .required('請選擇您的生日'),

        email: yup.string().required('Email是必填欄位').email('Email無效'),
        account: yup
            .string()
            .required('帳號是必填欄位')
            .min(2, '帳號需多於2個字元')
            .max(10, '帳號需少於10個字元'),
        password: yup
            .string()
            .required('密碼是必填欄位')
            .min(6, '密碼需多於6個字元')
            .max(40, '密碼需少於40個字元'),
    }),
    // step2 (optional, leave it blank)
    yup.object().shape({
        brokerId: yup.string().required('券商是必填欄位'),
        securitiesAccount: yup.string().required('帳號是必填欄位'),
        // .max(10, 'account must not exceed 10 characters'),
        securitiespassword: yup
            .string()
            .required('密碼是必填欄位')
            .min(8, '密碼需多於8個字元')
            .max(20, '密碼需少於10個字元'),
    }),

    // step3
    yup.object().shape({}),
    // step4
    yup.object().shape({}),
    // step5
    yup.object().shape({
        StartDate: yup.string().required('必填欄位'),
    }),
];

export { normalValidationSchema, starValidationSchema };
