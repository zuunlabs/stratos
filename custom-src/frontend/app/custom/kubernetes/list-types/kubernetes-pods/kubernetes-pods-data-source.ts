import { Store } from '@ngrx/store';

import { AppState } from '../../../../../../store/src/app-state';
import { ListDataSource } from '../../../../shared/components/list/data-sources-controllers/list-data-source';
import { IListConfig } from '../../../../shared/components/list/list.component.types';
import { BaseKubeGuid } from '../../kubernetes-page.types';
import { KubernetesPod } from '../../store/kube.types';
import { GetKubernetesPods } from '../../store/kubernetes.actions';

export class KubernetesPodsDataSource extends ListDataSource<KubernetesPod> {

  constructor(
    store: Store<AppState>,
    kubeGuid: BaseKubeGuid,
    listConfig: IListConfig<KubernetesPod>
  ) {
    const action = new GetKubernetesPods(kubeGuid.guid);
    super({
      store,
      action,
      schema: action.entity[0],
      getRowUniqueId: (row) => action.entity[0].getId(row),
      paginationKey: action.paginationKey,
      isLocal: true,
      listConfig,
      transformEntities: [{ type: 'filter', field: 'metadata.name' }]
    });
  }

}
