import e from 'express';
import express, {Application} from 'express';
import morgan from "morgan";

//Routes
import Router from "./routes/routes";

export class App{

    private app: Application;

    constructor(private port?: number | string){
        this.app = express();
        this.settings();
        this.middleware();
        this.routes();
    }

   async lsiten(){
        await this.app.listen(this.app.get('port'));
        console.log('Server on port:', this.app.get('port'));
    }

    settings(){
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middleware(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/app',Router);
    }
}