import Holder from './holder';

export interface HolderRepository {
    save: (holder: Holder) => Promise<void>;
};
