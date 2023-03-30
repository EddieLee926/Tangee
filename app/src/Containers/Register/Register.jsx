import React, { useState } from 'react';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import {
    GeneralButton,
    LinkButton,
} from '../../Components/General/CustomButton/CustomButton.jsx';
import { getDataLogic } from './RegisterLogic.js';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import RegisterBasicInfo from '../../Components/Register/RegisterBasicInfo/RegisterBasicInfo';
import InvestmentQuestionnaire from '../../Components/Register/InvestmentQuestionnaire/InvestmentQuestionnaire';
import RegisterItem from '../../Components/Register/RegisterItem/RegisterItem';
import Tag from '../../Components/Register/Tag/Tag.jsx';
import { useForm, FormProvider } from 'react-hook-form';
import ShareDate from '../../Components/Register/ShareDate/ShareDate';
import { yupResolver } from '@hookform/resolvers/yup';
import { starValidationSchema } from '../../Components/Register/validation.js';
import style from './RegisterStyle';

const useStyles = makeStyles(style);

// current date
const year = new Date().getFullYear();
const month = new Date().getMonth();
const date = new Date().getDate();
const currentDate = `${year}-${month + 1}-${date}`;

// step connector style
const QontoConnector = withStyles({
    alternativeLabel: {
        top: 18,
    },
    active: {
        '& $line': {
            backgroundImage: 'linear-gradient( 95deg, #FFC446 0%, #FF644E 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage: 'linear-gradient( 95deg, #FFC446 0%, #FF644E 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

// step circle style
const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#434343',
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage: 'linear-gradient( 136deg, #FFC446 0%, #FF644E 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage: 'linear-gradient( 136deg, #FFC446 0%, #FF644E 100%)',
    },
});

// step circle label
function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
    const icons = {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
    };
    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {completed ? <DoneIcon fontSize='small' /> : icons[String(props.icon)]}
        </div>
    );
}

//star註冊
function getSteps() {
    return ['填寫基本資料', '註冊以太坊帳號', '投資習慣問卷調查', '選擇產業標籤'];
}

function getStepContent(step, handleSelectTag) {
    switch (step) {
        case 0:
            return <RegisterBasicInfo />;
        case 1:
            return <RegisterItem />;
        case 2:
            return <InvestmentQuestionnaire />;
        case 3:
            //return <Tag num={3} handleSelectTag={handleSelectTag} />;
            return <Tag num={3} />;
        case 4:
            return <ShareDate />;
        default:
            return 'Unknown step';
    }
}
const defaultValues = {
    name: '',
    nick_name: '',
    birth: currentDate,
    email: '',
    account: '',
    password: '',
    brokerId: '',
    securitiesAccount: '',
    subPrice: '',
};

export default function HorizontalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const steps = getSteps();
    const currentValidationSchema = starValidationSchema[activeStep];

    const methods = useForm({
        shouldUnregister: false,
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(currentValidationSchema),
    });
    const { handleSubmit, trigger } = methods;

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = async (data) => {
        // const handleNext = (data) => {
        console.log(data, 'SSSS');
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        const isStepValid = await trigger();
        if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const onSubmit = async (data) => {
        var tagString = '';
        Object.keys(data).forEach((key) => {
            if (key.indexOf('tag') != -1) {
                tagString += ',' + key.substring(4);
            }
        });
        data.tag = tagString + ',';
        console.log('上傳的', data);
        // post data here
        const isStepValid = await trigger();
        if (isStepValid) {
            getDataLogic(data).then((result) => {
                console.log(result);
            });
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    return (
        <React.Fragment>
            <Stepper
                activeStep={activeStep}
                className={classes.stepperStyle}
                alternativeLabel
                connector={<QontoConnector />}
            >
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    // if (isStepOptional(index)) {
                    //     labelProps.optional = (
                    //         <Typography variant='body2' align='center'>
                    //             必填
                    //         </Typography>
                    //     );
                    // }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel
                                StepIconComponent={ColorlibStepIcon}
                                {...labelProps}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div className={classes.stepContentWrapper}>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography className={classes.instructions}>
                            註冊成功，請重新登入
                        </Typography>
                        <LinkButton category='normal' to='/login'>
                            重新登入
                        </LinkButton>
                    </React.Fragment>
                ) : (
                    <FormProvider {...methods}>
                        <form>
                            {getStepContent(activeStep)}
                            <div className={classes.buttons}>
                                <GeneralButton
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                >
                                    上一步
                                </GeneralButton>
                                {/* {isStepOptional(activeStep) && (
                                    <GeneralButton
                                        onClick={handleSkip}
                                        variant='contained'
                                    >
                                        skip
                                    </GeneralButton>
                                )} */}
                                {activeStep === steps.length - 1 ? (
                                    <GeneralButton
                                        onClick={handleSubmit(onSubmit)}
                                        category='normal'
                                    >
                                        完成
                                    </GeneralButton>
                                ) : (
                                    <GeneralButton onClick={handleNext} category='normal'>
                                        下一步
                                    </GeneralButton>
                                )}
                            </div>
                        </form>
                    </FormProvider>
                )}
            </div>
        </React.Fragment>
    );
}

//normal註冊
// const useStyles = makeStyles(() => ({
//     root: {
//         '& > *': {},
//     },
// }));

// function getSteps() {
//     return ['填寫基本資料', '註冊乙太坊', '投資意願問券調查', '選擇您感興趣的標籤'];
// }

// function getStepContent(step) {
//     switch (step) {
//         case 0:
//             return <RegisterBasicInfo />;
//         case 1:
//             return <RegisterItem />;
//         case 2:
//             return <InvestmentQuestionnaire />;
//         case 3:
//             return <Tag num={3} />;
//         default:
//             return 'Unknown step';
//     }
// }
// const defaultValues = {
//     name: '',
//     nick_name: '',
//     birth: '',
//     email: '',
//     account: '',
//     password: '',
// };

// export default function HorizontalLinearStepper() {
//     const classes = useStyles();
//     const [activeStep, setActiveStep] = useState(0);
//     const [skipped, setSkipped] = useState(new Set());
//     const steps = getSteps();
//     const currentValidationSchema = normalValidationSchema[activeStep];

//     const methods = useForm({
//         shouldUnregister: false,
//         mode: 'onChange',
//         defaultValues,
//         resolver: yupResolver(currentValidationSchema),
//     });
//     const { handleSubmit, reset, trigger } = methods;

//     const isStepOptional = (step) => {
//         return step === 1;
//     };

//     const isStepSkipped = (step) => {
//         return skipped.has(step);
//     };

//     const handleNext = async () => {
//         let newSkipped = skipped;
//         if (isStepSkipped(activeStep)) {
//             newSkipped = new Set(newSkipped.values());
//             newSkipped.delete(activeStep);
//         }
//         const isStepValid = await trigger();
//         if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         setSkipped(newSkipped);
//     };

//     const onSubmit = async (data) => {
//         // post data here
//         var tagString = ''
//         Object.keys(data).forEach(key => {
//             if (key.indexOf("tag") != -1) {
//                 tagString += ',' + key.substring(4)
//             }
//         });
//         data.tag = tagString
//         console.log("上傳的", data)
//         const isStepValid = await trigger();
//         if (isStepValid) {
//             getDataLogic(data).then((result) => {
//                 console.log(result);
//             });
//             setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         }
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const handleSkip = () => {
//         if (!isStepOptional(activeStep)) {
//             // You probably want to guard against something like this,
//             // it should never occur unless someone's actively trying to break something.
//             throw new Error("You can't skip a step that isn't optional.");
//         }

//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         setSkipped((prevSkipped) => {
//             const newSkipped = new Set(prevSkipped.values());
//             newSkipped.add(activeStep);
//             return newSkipped;
//         });
//     };

//     const handleReset = () => {
//         setActiveStep(0);
//         reset();
//     };

//     return (
//         <div className={classes.root}>
//             <Stepper activeStep={activeStep}>
//                 {steps.map((label, index) => {
//                     const stepProps = {};
//                     const labelProps = {};
//                     if (isStepOptional(index)) {
//                         labelProps.optional = (
//                             <Typography variant='caption'>Optional</Typography>
//                         );
//                     }
//                     if (isStepSkipped(index)) {
//                         stepProps.completed = false;
//                     }
//                     return (
//                         <Step key={label} {...stepProps}>
//                             <StepLabel {...labelProps}>{label}</StepLabel>
//                         </Step>
//                     );
//                 })}
//             </Stepper>
//             <div>
//                 {activeStep === steps.length ? (
//                     <div>
//                         <Typography className={classes.instructions}>
//                             All steps completed - you&apos;re finished
//                         </Typography>
//                         <Button onClick={handleReset} className={classes.button}>
//                             Reset
//                         </Button>
//                         <Button
//                             variant='contained'
//                             color='primary'
//                             component={Link}
//                             to='/login'
//                         >
//                             重新登入
//                         </Button>
//                     </div>
//                 ) : (
//                     <div>
//                         <FormProvider {...methods}>
//                             <form>
//                                 {getStepContent(activeStep)}
//                                 <Button
//                                     disabled={activeStep === 0}
//                                     onClick={handleBack}
//                                     className={classes.button}
//                                 >
//                                     Back
//                                 </Button>
//                                 {isStepOptional(activeStep) && (
//                                     <Button
//                                         variant='contained'
//                                         color='primary'
//                                         onClick={handleSkip}
//                                         className={classes.button}
//                                     >
//                                         Skip
//                                     </Button>
//                                 )}
//                                 {activeStep === steps.length - 1 ? (
//                                     <Button
//                                         variant='contained'
//                                         color='primary'
//                                         onClick={handleSubmit(onSubmit)}
//                                         className={classes.button}
//                                     >
//                                         Finish
//                                     </Button>
//                                 ) : (
//                                     <Button
//                                         variant='contained'
//                                         color='primary'
//                                         onClick={handleNext}
//                                         className={classes.button}
//                                     >
//                                         Next
//                                     </Button>
//                                 )}
//                             </form>
//                         </FormProvider>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
