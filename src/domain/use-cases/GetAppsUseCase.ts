// ============================================================
// DOMAIN LAYER — GetAppsUseCase
// Caso de uso: obtener la lista de apps del ecosistema.
// Depende del contrato IAppRepository (Dependency Injection).
// NO importa implementaciones concretas.
// ============================================================

import type { IAppRepository } from '../repositories/IAppRepository';
import type { AppProduct } from '../entities/AppProduct';
import { getAppStage } from '../entities/AppProduct';

export class GetAppsUseCase {
  constructor(private readonly repository: IAppRepository) {}

  /**
   * Ejecuta el caso de uso y retorna la lista de apps.
   * Aplica ordenamiento por status (production primero)
   * y filtrado opcional por categoría.
   */
  async execute(options?: GetAppsOptions): Promise<AppProduct[]> {
    const apps = await this.repository.getApps();

    let result = apps.filter((app) => app.isListed && getAppStage(app.status) !== null);

    // Filtrar por categoría si se especifica
    if (options?.category) {
      result = result.filter((app) => app.category === options.category);
    }

    // Filtrar por plataforma si se especifica
    if (options?.platform) {
      result = result.filter((app) =>
        app.platforms.includes(options.platform!)
      );
    }

    // Filtrar solo disponibles si se requiere
    if (options?.onlyAvailable) {
      result = result.filter((app) => app.isAvailable);
    }

    return result.sort(sortByStatus);
  }
}

export interface GetAppsOptions {
  category?: AppProduct['category'];
  platform?: AppProduct['platforms'][number];
  onlyAvailable?: boolean;
}

const statusOrder: Record<AppProduct['status'], number> = {
  production: 0,
  maintenance: 1,
  beta: 2,
  alpha: 3,
  development: 4,
  design: 5,
  planned: 6,
  deprecated: 7,
};

function sortByStatus(a: AppProduct, b: AppProduct): number {
  return statusOrder[a.status] - statusOrder[b.status];
}
