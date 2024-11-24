import buildFpsChecker from '@/components/Tool/FpsChecker';
import { isHostnameLocal } from '@/lib/utils';

export default function createFpsChecker() {
    const hostname = isHostnameLocal()
    if (hostname)
        buildFpsChecker();
};
