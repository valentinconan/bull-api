const messageQueue = require('./queue-config');

const consumer = () => {
    console.log('Consumer ready to consume messages');
    // Processus de consommation des messages
    messageQueue.process(async (job) => {
        try{
            const message = job.data;
            if(message.error){
                //simulate error here
                throw new Error("simulated error")
            }
            console.log('Message consumed:', message);
            // simulate process
            await new Promise(resolve => setTimeout(resolve, 1000));
        }catch (error){
            console.error('Erreur lors de consumed:', error);
            // Move the job to the failed state and retry later if needed
            await job.moveToFailed({ message: error.message }, true);
            return Promise.reject(error);
        }
    });

    // Gestionnaire global des erreurs
    messageQueue.on('failed', (job, error) => {
        console.error(`Job ${job.id} failed with error: ${error.message}`);
    });
}

module.exports = consumer;
