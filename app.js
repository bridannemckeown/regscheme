const submitButton = document.querySelector('.jfu-submit');
const formContainer = document.querySelector('.form-container');
const undocCheck = document.querySelector('#undoc');
const undocTime = document.querySelector('#time-undoc');
const legalPermission = document.querySelector('#legal-permission');
const children = document.querySelector('#children');
const dpo = document.querySelector('#DPO');
const firstName = document.querySelector('#first_name');
const criteriaCheck = document.querySelector('.criteria-check');
const redirect = document.querySelector('.redirect');
const campaign = document.querySelector('#campaign');
const campaignStatus = document.querySelector('#member_status');

// redirecting URLs based on eligibility 
const eligible = () => {
    redirect.value = 'https://www.mrci.ie/regularisation-scheme-2021-2022-eligible/';
    campaign.value = '7014G000001nrM1';
    campaignStatus.value = 'Likely Eligible';
    // formContainer.remove();
    // const heading = document.createElement('h2');
    // heading.textContent = 'Eligible';
    // criteriaCheck.insertAdjacentElement('afterend', heading);
}

const ineligible = () => {
    redirect.value = 'https://www.mrci.ie/donate';
    // campaign.value = '7014G000001nrM1';
    // campaignStatus.value = 'Likely Ineligible';
    console.log('ineligible');
}

const eligibleLegal = () => {
    console.log('eligible legal');
    // redirect.value = 'https://www.mrci.ie/regularisation-scheme-2021-2022-eligible/';
    // campaign.value = '7014G000001nrM1';
    // campaignStatus.value = 'Eligible Legal';
}


submitButton.addEventListener('click', (e) => {
    if (firstName.value !== "") {
        if (undocCheck.checked !== true) {
            e.preventDefault();
            ineligible();
        }   else if (undocTime.value === '3 years' && children.checked == true) {
            eligible();
        }   else if (undocTime.value === '3 years' || undocTime.value === 'Less than 3 years') {
            e.preventDefault();
            ineligible();
        }   else if (undocTime.value === '4 years' || undocTime.value === 'More than 4 years') {
                if (legalPermission.checked === true) {
                    e.preventDefault();
                    eligibleLegal();
                } else {
                    e.preventDefault();
                    eligible();
                }
            
        }
    }
});

