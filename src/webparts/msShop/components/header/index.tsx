
import * as React from 'react';

export interface ITestState {
    company: string;
}

export default class Test extends React.Component<{}, ITestState> {
    constructor(props) {
        super(props);

        this.state = {
            company: "Microsoft"
        }
    }

    public render() {
        return (
            <div>
                <p>Welcome to {this.state.company}</p>
            </div>
        );
    }
}


