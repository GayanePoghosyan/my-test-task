
import { IsNotEmpty, IsString,} from 'class-validator';

export class UpdateStockDto {
    @IsNotEmpty()
    @IsString()
    symbol: string;

    @IsNotEmpty()
    @IsString()
    action: string;
}