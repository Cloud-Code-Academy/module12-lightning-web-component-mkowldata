import { LightningElement } from 'lwc';
    const devFundWeight = 0.23;
    const processAutoWeight = 0.30;
    const userIntWeight = 0.25;
    const testDebugWeight = 0.22;
    const passingScore = 68;

export default class PlatformDevCertCalculator extends LightningElement {
    

    devFundamentalScore = 0;
    processAutomationScore = 0;
    userInterfaceScore = 0;
    testingScore = 0;

    certificationScore = 0;
    numberOfQuestions = 60;

    showResources = false;

    showGoodJob = false;

    currentHistoryId = 0;

    attemptHistory = [
        {Id: 1, Score: 0},
        {Id: 2, Score: 0},
        {Id: 3, Score: 0},
        {Id: 4, Score: 0}
    ];

    calculateScore(){
        let devFundWeightScore = this.devFundamentalScore * devFundWeight;
        let processAutoWeightScore = this.processAutomationScore * processAutoWeight;
        let userIntWeightScore = this.userInterfaceScore * userIntWeight;
        let testDebugWeightScore = this.testingScore * testDebugWeight;
        this.certificationScore = devFundWeightScore + processAutoWeightScore + userIntWeightScore + testDebugWeightScore;

        this.showResourceIfFailed();
        this.addAttemptHistory(this.certificationScore);
    }

    handleChange(event){
        console.log(event.target.value, event.target.name);
        console.log(event.target.type);
        console.log(event.target.label);
        const inputName = event.target.name;
        let value = Number(event.target.value);
        if( inputName === 'devFundamentals') {
            this.devFundamentalScore = value;
        } else if (inputName === 'processAuto') {
            this.processAutomationScore = value;
        } else if (inputName === 'userInterface') {
            this.userInterfaceScore = value;
        } else if( inputName === 'testDebugDeploy') {
            this.testingScore = value;
        }     
    }
    showResourceIfFailed(){
        if(this.certificationScore < passingScore) {
            this.showResources = true;
            
        } else {
            this.showResources = false;
        }
        this.showGoodJob = !this.showResources;
    }
    addAttemptHistory(Score) {
        this.currentHistoryId ++;
        const attempt = 
            {
              Id: this.attemptHistory.length + 1, Score
            }
        this.attemptHistory = [...this.attemptHistory, attempt];
    }

    deleteAttemptHandler(event){
        console.log('this is called from parent to handle delete', event.detail);
        let attemptId = event.detail;
        this.attemptHistory = this.attemptHistory.filter(attempt => attempt.Id != attemptId);
        console.log('New attempt history' + this.attemptHistory);
    }

    connectedCallBack() {
        this.currentHistoryId = this.attemptHistory.length;
    }
}
