const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile');

module.exports = {

    async index(req, res) {

        const jobs = await Job.get();
        const profile = await Profile.get()




        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        // total de horas por dia de cada job em progresso
        let jobTotalHours = 0;

        //esse map faz o método para cada elemento do array jobs
        const updatedJobs = jobs.map((job) => {
            
            const remaining = JobUtils.remainingDays(job);//pega o retorno da função e retorna pra variavel remaining
            const status = remaining <= 0 ? 'done' : 'progress';
            
            //Somando a quantidade de status
            statusCount[status] += 1;

            // total de horas por dia de cada job em progresso
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours
            return {

                ...job,//essas reticências serve para pegar tudo que tem em um elemento job e "concatenar" com as variaveis abaixo, fazendo com que um job, tenha mais coisas
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])

            }

        })

        //quantidade de horas que quero trabalhar dia (profile) MENOS a quantidade de horas/dias de cada job em progress

        const freeHours = profile["hours-per-day"] - jobTotalHours

    

        return res.render("index", { jobs: updatedJobs, profile: profile, statusCount, freeHours })//retorna o index e passa o jobs atualizado, no ejs ele é usado para ser mostrado na tela, lá ele se chama jobs

    }
}

