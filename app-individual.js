const submitButton = document.querySelector('.jfu-submit');
const formContainer = document.querySelector('.form-container');
const undocCheck = document.querySelector('#undoc');
const undocTime = document.querySelector('#time-undoc');
const legalPermission = document.querySelector('#legal-permission');
const legalPermissionReturn = document.querySelector('#legal-permission-return');
const dpo = document.querySelector('#DPO');
const firstName = document.querySelector('#first_name');
const criteriaCheck = document.querySelector('.criteria-check');
const redirect = document.querySelector('.redirect');
const campaign = document.querySelector('#campaign');
const campaignStatus = document.querySelector('#member_status');
const undocQuestion = document.querySelector('.undoc-question');
const undocOut = document.querySelector('.undoc-out');
const undocReturn = document.querySelector('.undoc-return');
const dob = document.querySelector('#dob');
const parentsPair = document.querySelector('.parents');
const siblingsPair = document.querySelector('.siblings');
const childrenPair = document.querySelector('.children');
const majorCrime = document.querySelector('#major-crime');
const parentsCheck = document.querySelector('#parents');
const siblingsCheck = document.querySelector('#siblings');
const childrenCheck = document.querySelector('#children');



undocCheck.addEventListener('change', (e) => {
    if (undocCheck.checked === true) {
        undocQuestion.style.display = "block";
    } else if (undocCheck.checked === false) {
        undocQuestion.style.display = "none";
        undocTime.value = "none";
        undocOut.style.display = "none";
        legalPermission.value = "none";
        undocReturn.style.display = "none";
        legalPermissionReturn.value = "none";
    }
});

undocTime.addEventListener('change', (e) => {
    if (undocTime.value !== 'Less than 3 years') {
        undocOut.style.display = "block";
    } else if (undocTime.value === 'Less than 3 years') {
        undocOut.style.display = "none";
        undocReturn.style.display = "none";
}
});

legalPermission.addEventListener('change', (e) => {
    if (legalPermission.value !== 'Did not leave Ireland') {
        undocReturn.style.display = "block";
    } else if (legalPermission.value === 'Did not leave Ireland') {
        undocReturn.style.display = "none";
    }
});

// calculating age of user
const under18 = new Date("2004-02-01");
const over18 = new Date("2004-01-31");
const under23 = new Date("1998-02-01");
const over24 = new Date("1998-01-31");
dob.addEventListener('change', (e)=> {
    const dobValue = new Date(dob.value);
    if (dobValue >= under18) {
        parentsPair.style.display = "block";
        siblingsPair.style.display = "none";
        childrenPair.style.display = "none";
    } else if (dobValue <= over18 && dobValue >= under23) {
        siblingsPair.style.display = "block";
        childrenPair.style.display = "block";
        parentsPair.style.display = "none";
    } else if (dobValue <= over24) {
        childrenPair.style.display = "block";
        parentsPair.style.display = "none";
        siblingsPair.style.display = "none";
    }
});



// redirecting URLs based on eligibility 
const eligible = () => {
    redirect.value = 'https://www.mrci.ie/regularisation-scheme-2021-2022-eligible/';
    campaign.value = '7014G000001nrM1';
    campaignStatus.value = 'Likely Eligible';
}

const ineligible = () => {
    console.log('ineligible');
    redirect.value = 'https://www.mrci.ie/donate';
    campaign.value = '7014G000001nrM6';
    campaignStatus.value = 'Likely Ineligible';
}

const eligibleLegal = () => {
    console.log('eligible legal');
    redirect.value = 'https://www.mrci.ie/';
    campaign.value = '7014G000001nrM1';
    campaignStatus.value = 'Eligible Legal';
}



submitButton.addEventListener('click', (e) => {
    const dobValue = new Date(dob.value);
    if (firstName.value !== "") {
        if (undocCheck.checked === false) {
            ineligible();
        }   else if (majorCrime.checked === true) {
            ineligible();
        }   else if (legalPermission.value === "More than 60 days") {
            ineligible();
        }   else if (legalPermissionReturn.value === "More than 90 days") {
            ineligible();
        }   else if (dobValue >= under18) {
                if (parentsCheck.checked === true) {
                    eligible();
                } else {
                    ineligible();
                }
        }   else if (dobValue <= over18 && dobValue >= under23) {
                if (undocTime.value === 'Less than 3 years') {
                    ineligible();
                } else if (undocTime.value === '4 years or more') {
                    eligible();
                } else if (undocTime.value === '3-4 years') {
                    if (siblingsCheck.checked === true || childrenCheck.checked === true) {
                        eligible();
                    } else {
                        ineligible();
                    }
                } else {
                    ineligible();
                }
        }   else if (dobValue <= over24) {
                if (undocTime.value === 'Less than 3 years') {
                    ineligible();
                } else if (undocTime.value === '4 years or more') {
                    eligible();
                } else if (undocTime.value === '3-4 years') {
                    if (childrenCheck.checked === true) {
                        eligible();
                    } else {
                        ineligible();
                    }
                } else {
                    ineligible();
                }
        } else {
            ineligible();
        }
    }
});
