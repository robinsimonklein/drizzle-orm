import { AnyTable } from 'drizzle-orm';
import { ColumnData, ColumnDriverParam, ColumnHasDefault, ColumnNotNull, TableName } from 'drizzle-orm/branded-types';

import { PgColumn, PgColumnBuilder } from './common';

export class PgTextBuilder<
	TData extends string = string,
	TNotNull extends ColumnNotNull = ColumnNotNull<false>,
	THasDefault extends ColumnHasDefault = ColumnHasDefault<false>,
> extends PgColumnBuilder<ColumnData<TData>, ColumnDriverParam<string>, TNotNull, THasDefault> {
	/** @internal */
	override build<TTableName extends TableName>(
		table: AnyTable<TTableName>,
	): PgText<TTableName, TNotNull, THasDefault, TData> {
		return new PgText(table, this);
	}
}

export class PgText<
	TTableName extends TableName,
	TNotNull extends ColumnNotNull,
	THasDefault extends ColumnHasDefault,
	TData extends string,
> extends PgColumn<TTableName, ColumnData<TData>, ColumnDriverParam<string>, TNotNull, THasDefault> {
	protected brand!: 'PgText';

	constructor(table: AnyTable<TTableName>, builder: PgTextBuilder<TData, TNotNull, THasDefault>) {
		super(table, builder);
	}

	getSQLType(): string {
		return 'text';
	}
}

export function text<T extends string = string>(name: string) {
	return new PgTextBuilder<T>(name);
}
