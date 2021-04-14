module.exports = {
    
    remainingDays(job) {
        //ajustes no job
        //calculo de tempo restante
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

        const createdDtate = new Date(job.created_at);
        const dueDay = createdDtate.getDate() + Number(remainingDays)
        const dueDate = createdDtate.setDate(dueDay)

        const timeDiffInMs = dueDate - Date.now()
        // transformar mili segundos em dias

        const dayInMs = 1000 * 60 * 60 * 24;
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs);

        //restam x dias
        return dayDiff
    },

    calculateBudget: (job, valueHour) =>  valueHour * job["total-hours"]
}